import { useState } from 'react';
import { FormBuilder } from './features/FormBuilder/FormBuilder';
import { FormRenderer } from './features/FormRenderer/FormRenderer';
import { FormElement } from './features/FormBuilder/FormElement';
import { Container } from '@chakra-ui/react';
import { Navbar } from "./components/Navbar/index.ts"

function App() {

  return (
    <>
      <Navbar />
      <Container>
        <FormBuilder />
        <div></div>
      </Container>
    </>
  );
}

export default App;
