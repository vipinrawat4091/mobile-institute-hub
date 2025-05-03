
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  // Automatically redirect to the login page
  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;
