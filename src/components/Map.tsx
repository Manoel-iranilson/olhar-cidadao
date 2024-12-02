import { useEffect, useRef } from 'react';
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
import 'ol/ol.css';

interface Report {
  id: number;
  latitude: number;
  longitude: number;
  description: string;
  resolved: boolean;
}

interface MapProps {
  reports: Report[];
}

const MapComponent = ({ reports }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Criar fonte de dados para os marcadores
    const markers = new VectorSource();
    
    // Adicionar marcadores para cada denúncia
    reports.forEach(report => {
      const marker = new Feature({
        geometry: new Point(fromLonLat([report.longitude, report.latitude])),
        properties: {
          id: report.id,
          description: report.description,
          resolved: report.resolved
        }
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
        center: fromLonLat([-46.6333, -23.5505]), // São Paulo
        zoom: 13
      })
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [reports]);

  return (
    <div 
      ref={mapRef} 
      style={{ width: '100%', height: '400px' }}
      className="rounded-lg mb-8 shadow-lg"
    />
  );
};

export default MapComponent;