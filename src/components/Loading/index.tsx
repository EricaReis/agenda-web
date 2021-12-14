import React from 'react';

import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <Container>
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </Container>
    );
}

export default Loading;