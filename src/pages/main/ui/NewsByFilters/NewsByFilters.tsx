import { useAppSelector } from "@/app/appStore";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useGetNewsQuery } from "@/entities/news/api/newsApi";
import NewsFilters from "@/widgets/news/ui/NewsFilters/NewsFilters";
import styles from "./styles.module.css";
import {useGetCategoriesQuery} from "@/entities/category/api/categoriesApi.ts";
import NewsListWithPagination from "@/pages/main/ui/NewsListWithPagination/NewsListWithPagination.tsx";

const NewsByFilters = () => {

    const filters = useAppSelector((state) => state.news.filters);
    const news = useAppSelector((state) => state.news.news);

    const debouncedKeywords = useDebounce(filters.keywords, 1500);

    const { isLoading } = useGetNewsQuery({
        ...filters,
        keywords: debouncedKeywords,
    });

    const { data } = useGetCategoriesQuery(null);

    return (
        <section className={styles.section}>
            <NewsFilters filters={filters} categories={data?.categories || []}/>

            <NewsListWithPagination isLoading={isLoading} news={news} filters={filters}/>
        </section>
    );
};

export default NewsByFilters;
