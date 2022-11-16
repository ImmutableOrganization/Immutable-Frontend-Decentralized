import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Frame } from "../components/Frame";


const Custom404: NextPage = () => {

    return (
        <div className="four_o_four">
            <Head>
                <title>404 | Permanent Post</title>
            </Head>
            <Frame headerText="404 Page Not Found" body={() =>
                <>
                    <div>INVALID URL ENTERED</div>
                    <a href='/'>Click to go to home page.</a>
                </>
            } />
        </div>
    );
};
export default Custom404
