import { NextPage } from "next";
import Head from "next/head";
import homeStyles from "../styles/Home.module.css";
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Jun Beom</title>
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[Jun Beom Introduction]</p>
        <p>(This is a website)</p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}></ul>
      </section>
    </div>
  );
};
export default Home;
