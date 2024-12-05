import Header from "@/components/Header";
import Stats from "@/components/Stats";
import Map from "@/components/Map";
import Contact from "@/components/Contact";

const Index = () => {
  // Dados mockados para demonstração em Juazeiro do Norte
  const mockReports = [
    {
      id: 1,
      latitude: -7.2131,
      longitude: -39.3150,
      description: "Buraco na calçada",
      resolved: false,
      address: "Rua São Pedro, 123",
      createdAt: "2024-03-15T10:00:00Z",
      photos: []
    },
    {
      id: 2,
      latitude: -7.2231,
      longitude: -39.3250,
      description: "Iluminação pública defeituosa",
      resolved: true,
      address: "Av. Padre Cícero, 456",
      createdAt: "2024-03-10T15:30:00Z",
      resolvedAt: "2024-03-12T09:00:00Z",
      photos: []
    },
    {
      id: 3,
      latitude: -7.2031,
      longitude: -39.3050,
      description: "Lixo acumulado",
      resolved: false,
      address: "Rua do Cruzeiro, 789",
      createdAt: "2024-03-14T08:45:00Z",
      photos: []
    },
  ];

  const resolvedCount = mockReports.filter(r => r.resolved).length;
  const pendingCount = mockReports.filter(r => !r.resolved).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <Stats resolved={resolvedCount} pending={pendingCount} />
      <Map reports={mockReports} />
      <Contact />
    </div>
  );
};

export default Index;