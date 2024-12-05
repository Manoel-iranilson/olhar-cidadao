const Header = () => {
  return (
    <header className="text-center py-8 px-4">
      <div className="flex justify-center mb-6">
        <img 
          src="/lovable-uploads/19f27fbc-b5f1-4bac-9815-c353020d1953.png" 
          alt="Olhar Cidadão Logo" 
          className="h-32 w-auto"
        />
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Uma plataforma para monitoramento e denúncia de problemas urbanos, 
        conectando cidadãos e poder público para construir uma cidade melhor.
      </p>
    </header>
  );
};

export default Header;