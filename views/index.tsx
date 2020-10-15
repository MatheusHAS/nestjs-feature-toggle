import React, { Fragment } from 'react';

interface IndexProps {
  user: any;
}

const superMachineImage = "https://t2.tudocdn.net/544951?w=1200";

const Index = ({ user, image, flags } : IndexProps) => {
  return (
    <Fragment>
      <p>Bem vindo {user?.name}!</p>
      <img src={image} />
      <br/>
      <br/>
      {
        flags.showSuperMachineBanner ? <img src={superMachineImage} /> : null
      }      
    </Fragment>
  );
};

export default Index;