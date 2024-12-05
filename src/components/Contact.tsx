import { Card } from "@/components/ui/card";

const Contact = () => {
  return (
    <Card className="p-6 mb-8">
      <h2 className="text-2xl font-bold text-primary mb-4">Entre em Contato</h2>
      <div className="space-y-2">
        <p className="text-gray-600">
          <span className="font-semibold">Endereço:</span> Rua São Pedro, 391 - São Miguel, Juazeiro do Norte - CE, 63010-010
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Email:</span> contato@olharcidadao.com.br
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Telefone:</span> (88) 3512-3456
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Horário de Atendimento:</span> Segunda a Sexta, das 9h às 18h
        </p>
      </div>
    </Card>
  );
};

export default Contact;