import Header from "@/components/Header";
import Stats from "@/components/Stats";
import Map from "@/components/Map";
import Contact from "@/components/Contact";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { startOfWeek, startOfMonth, startOfYear, isAfter } from "date-fns";

const Index = () => {
  const [timeFilter, setTimeFilter] = useState("all");

  // Dados mockados para demonstração em Juazeiro do Norte
  const allReports = [
    {
      id: 1,
      latitude: -7.2131,
      longitude: -39.3150,
      description: "Lixo e entulho acumulado na calçada",
      resolved: false,
      address: "Rua São Pedro, 123",
      createdAt: "2024-03-18T10:00:00Z", // Esta semana
      photos: [
        "/lovable-uploads/bc27f7c6-7c7e-4aaf-90f1-43cd19adf92a.png",
        "/lovable-uploads/3f8f8250-5410-4296-968b-8aaf6af286c4.png"
      ]
    },
    {
      id: 2,
      latitude: -7.2231,
      longitude: -39.3250,
      description: "Árvore caída bloqueando a via",
      resolved: true,
      address: "Av. Padre Cícero, 456",
      createdAt: "2024-12-15T15:30:00Z", // Dezembro 2024
      resolvedAt: "2024-12-17T09:00:00Z",
      photos: [
        "/lovable-uploads/2589f548-80a1-4fef-b312-c816b09315d8.png"
      ]
    },
    {
      id: 3,
      latitude: -7.2031,
      longitude: -39.3050,
      description: "Vazamento de água na via pública",
      resolved: false,
      address: "Rua do Cruzeiro, 789",
      createdAt: "2024-03-19T08:45:00Z", // Esta semana
      photos: [
        "/lovable-uploads/6aed2639-6158-49f3-ba93-184af0acb156.png"
      ]
    },
    {
      id: 4,
      latitude: -7.2331,
      longitude: -39.3350,
      description: "Buraco na via pública",
      resolved: false,
      address: "Rua das Flores, 321",
      createdAt: "2024-11-20T14:20:00Z", // Novembro 2024
      photos: [
        "/lovable-uploads/bc27f7c6-7c7e-4aaf-90f1-43cd19adf92a.png"
      ]
    },
    {
      id: 5,
      latitude: -7.1931,
      longitude: -39.3450,
      description: "Poste com iluminação defeituosa",
      resolved: true,
      address: "Av. Leão Sampaio, 987",
      createdAt: "2024-11-28T16:15:00Z", // Novembro 2024
      resolvedAt: "2024-11-30T10:30:00Z",
      photos: [
        "/lovable-uploads/3f8f8250-5410-4296-968b-8aaf6af286c4.png"
      ]
    },
    {
      id: 6,
      latitude: -7.2431,
      longitude: -39.2950,
      description: "Calçada danificada",
      resolved: true,
      address: "Rua São José, 654",
      createdAt: "2024-12-01T09:40:00Z", // Dezembro 2024
      resolvedAt: "2024-12-05T15:20:00Z",
      photos: [
        "/lovable-uploads/2589f548-80a1-4fef-b312-c816b09315d8.png"
      ]
    },
    {
      id: 7,
      latitude: -7.2181,
      longitude: -39.3200,
      description: "Faixa de pedestres apagada",
      resolved: false,
      address: "Av. do Comércio, 147",
      createdAt: "2024-03-20T11:25:00Z", // Esta semana
      photos: [
        "/lovable-uploads/6aed2639-6158-49f3-ba93-184af0acb156.png"
      ]
    }
  ];

  const filterReports = () => {
    let startDate;
    const now = new Date();

    switch (timeFilter) {
      case "week":
        startDate = startOfWeek(now);
        break;
      case "month":
        startDate = startOfMonth(now);
        break;
      case "year":
        startDate = startOfYear(now);
        break;
      default:
        return allReports;
    }

    return allReports.filter(report => 
      isAfter(new Date(report.createdAt), startDate)
    );
  };

  const filteredReports = filterReports();
  const resolvedCount = filteredReports.filter(r => r.resolved).length;
  const pendingCount = filteredReports.filter(r => !r.resolved).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <div className="mb-6">
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as denúncias</SelectItem>
            <SelectItem value="week">Última semana</SelectItem>
            <SelectItem value="month">Último mês</SelectItem>
            <SelectItem value="year">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Stats resolved={resolvedCount} pending={pendingCount} />
      <Map reports={filteredReports} />
      <Contact />
    </div>
  );
};

export default Index;