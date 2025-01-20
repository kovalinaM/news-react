import { getLatestNews } from "../../api/apiNews.ts";
import { useFetch } from "../../helpers/hooks/useFetch";
import BannersList from "../BannersList/BannersList.tsx";
import styles from "./styles.module.css";
import {NewsApiResponse} from "@/interfaces";

const LatestNews = () => {
    const { data, isLoading } = useFetch<NewsApiResponse, null>(getLatestNews);

    return (
        <section className={styles.section}>
            <BannersList banners={data && data.news} isLoading={isLoading} />
        </section>
    );
};

export default LatestNews;
