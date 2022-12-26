import Head from "next/head";
import { Content, Inter } from "@next/font/google";
import { Box, chakra, Container } from "@chakra-ui/react";
import { DamageCalculator } from "../components/damage-calculator";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Calculator :: Starless Umbra</title>
        <meta name="description" content="Starless Umbra stat calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container my={20}>
        <DamageCalculator />
      </Container>
    </>
  );
}

export { getServerSideProps } from "../components/chakra";
