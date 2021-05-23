import React from 'react';
import logo from '../logo.svg';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Header, Image } from 'semantic-ui-react';
import { PATH } from '../routes/Routes';


export default function NotFoundScreen() {
  const history = useHistory();

  return (
    <div className='not-found'>
      <style>
        {`
          body > div,
          body > div > div,
          body > div > div > div.not-found {
            height: 100%;
          }
        `}
      </style>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' centered columns='2' stackable>
        <Grid.Column textAlign='right'>
          <Image src={logo} size='medium' floated='right' />
        </Grid.Column>
        <Grid.Column>
          <Header color='teal' style={{ fontSize: '6rem' }}>404</Header>
          <Header size='large' color='grey'>404 Page Not Found</Header>
          <Button
            content='Back to home'
            color='blue'
            size='big'
            icon='arrow left'
            onClick={() => history.replace(PATH.HOME)} />
        </Grid.Column>
      </Grid>
    </div>
  )
}