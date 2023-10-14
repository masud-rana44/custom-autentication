const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-900 h-full min-h-screen  flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
