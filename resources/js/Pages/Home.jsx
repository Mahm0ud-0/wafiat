import { Head, usePage } from "@inertiajs/react";
import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import KeyFeatures from "../Components/KeyFeatures";
import Details from "../Components/Details";
import Hr from "../Components/Hr";
import Footer from "../Components/Footer";

const Home = () => {

    return (
        <main className="pt-20">
            <Head title="الرئيسية" />
            <Header />
            <Hero />
            <Hr className="mt-0" />
            <KeyFeatures />
            <Hr className="mb-0" />
            <Details />
            <Footer />
        </main>
    );
};

export default Home;
