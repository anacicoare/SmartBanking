import {Button, Card, Divider} from "@mantine/core";
import React from "react";

export default function Header() {
  /**
   * Reload the page with the latest data
   */

  return (
      <React.Fragment>
      <Card className='flex h-[60px] justify-between w-screen bg-transparent'>
          <div >
              <h2 className={'text-white font-semibold -mt-1 ml-7'}>Smartbanking</h2>
          </div>
          <div>
              <Button variant={'outline'} color={'gray.1'} radius={'xl'} size={'sm'}>Intră în cont</Button>
              <Button variant={'filled'} color={'gray.1'} radius={'xl'} size={'sm'} className={'text-black ml-5 mr-10'}>Înregistrează-te acum</Button>
          </div>
      </Card>
          <Divider color={'white'} size={'sm'} className={'ml-10 mr-10'}/>
      </React.Fragment>
  );
}
