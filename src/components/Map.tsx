import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

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

const Map = ({ reports }: MapProps) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: -23.5505,
    lng: -46.6333
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        className="mb-8"
      >
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={{
              lat: report.latitude,
              lng: report.longitude
            }}
            icon={{
              url: report.resolved
                ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                : "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
            }}
            title={`Denúncia #${report.id}: ${report.description}`}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;