import { Card } from "@/components/ui/card";

const Contact = () => {
  return (
    <Card className="p-6 mb-8">
      <h2 className="text-2xl font-bold text-primary mb-4">Entre em Contato</h2>
      <div className="space-y-2">
        <p className="text-gray-600">
          <span className="font-semibold">Email:</span> contato@olharcidadao.com.br
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Telefone:</span> (11) 1234-5678
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Horário de Atendimento:</span> Segunda a Sexta, das 9h às 18h
        </p>
      </div>
    </Card>
  );
};

export default Contact;