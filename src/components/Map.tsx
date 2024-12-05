import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent } from "@/components/ui/card";
import 'ol/ol.css';

interface Report {
  id: number;
  latitude: number;
  longitude: number;
  description: string;
  resolved: boolean;
  address?: string;
  createdAt: string;
  resolvedAt?: string;
  photos?: string[];
}

interface MapProps {
  reports: Report[];
}

const MapComponent = ({ reports }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    // Criar fonte de dados para os marcadores
    const markers = new VectorSource();
    
    // Adicionar marcadores para cada denúncia
    reports.forEach(report => {
      const marker = new Feature({
        geometry: new Point(fromLonLat([report.longitude, report.latitude])),
        properties: report
      });

      // Definir estilo do marcador baseado no status
      const markerStyle = new Style({
        image: new Icon({
          src: report.resolved
            ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
            : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          scale: 0.5,
          anchor: [0.5, 1]
        })
      });

      marker.setStyle(markerStyle);
      markers.addFeature(marker);
    });

    // Criar camada de marcadores
    const vectorLayer = new VectorLayer({
      source: markers
    });

    // Criar mapa
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([-39.3150, -7.2131]), // Juazeiro do Norte, CE
        zoom: 13
      })
    });

    // Adicionar evento de clique
    map.on('click', (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
      
      if (feature) {
        const properties = feature.get('properties');
        if (properties) {
          setSelectedReport(properties);
          setIsModalOpen(true);
        }
      }
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [reports]);

  const getTimeStatus = (report: Report) => {
    const createdDate = new Date(report.createdAt);
    
    if (report.resolved && report.resolvedAt) {
      const resolvedDate = new Date(report.resolvedAt);
      return `Resolvida há ${formatDistanceToNow(resolvedDate, { locale: ptBR })}`;
    }
    
    return `Aberta há ${formatDistanceToNow(createdDate, { locale: ptBR })}`;
  };

  return (
    <>
      <div 
        ref={mapRef} 
        style={{ width: '100%', height: '400px' }}
        className="rounded-lg mb-8 shadow-lg"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedReport && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                Denúncia {selectedReport.resolved ? '(Resolvida)' : '(Pendente)'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p><strong>Descrição:</strong> {selectedReport.description}</p>
                    <p><strong>Endereço:</strong> {selectedReport.address || 'Não informado'}</p>
                    <p><strong>Data de criação:</strong> {format(new Date(selectedReport.createdAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}</p>
                    <p><strong>Status:</strong> {getTimeStatus(selectedReport)}</p>
                  </div>
                </CardContent>
              </Card>

              {selectedReport.photos && selectedReport.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedReport.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Foto ${index + 1} da denúncia`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default MapComponent;