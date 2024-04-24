import {Button, Card, Divider} from "@mantine/core";
import React from "react";
import {useRouter} from "next/router";

export default function Header() {
  /**
   * Reload the page with the latest data
   */
    const router = useRouter();
  return (
      <React.Fragment>
      <div className='flex h-[60px] justify-between w-[90%] bg-transparent'>
          <div >
              <h2 className={'text-white font-semibold ml-10 mt-3'}>Smartbanking</h2>
          </div>
          <div>
              <Button variant={'outline'} color={'gray.1'} radius={'xl'} size={'sm'} className={'mt-4 mr-3'} onClick={() => {router.push('/login')}}>Intră în cont</Button>
              <Button variant={'filled'} color={'gray.1'} radius={'xl'} size={'sm'} className={'text-black -mr-16'} onClick={() => {router.push('/register')}}>Înregistrează-te acum</Button>
          </div>
      </div>
          <Divider color={'white'} size={'sm'} className={'ml-10 mr-10'}/>
      </React.Fragment>
  );
}
