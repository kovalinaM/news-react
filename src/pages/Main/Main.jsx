import styles from './styles.module.css';
import NewsBanner from "../../components/NewsBanner/NewsBanner.jsx";
import NewsList from "../../components/NewsList/NewsList.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import {useEffect, useState} from "react";
import { getNews} from "../../api/apiNews.js";
import dataCategories from "../../utils/data.js";
import Categories from "../../components/Categories/Categories.jsx";
import Search from "../../components/Search/Search.jsx";
import {useDebounce} from "../../helpers/hooks/useDebounce.js";
import {TOTAL_PAGES, PAGE_SIZE} from "../../constants/constants.js";

const Main = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [keywords, setKeywords] = useState('');

    const debouncedKeywords = useDebounce(keywords, 1500);

    const fetchNews = async (currentPage) => {
        try {
            setIsLoading(true);
            const response = await getNews({
                page_number: currentPage,
                page_size: PAGE_SIZE,
                category: selectedCategory === 'All' ? null : selectedCategory,
                keywords: debouncedKeywords,
            });
            setNews(response.news);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCategories = () => {
        setCategories(['All', ...dataCategories.categories]);
    }

    useEffect(() => {
            fetchCategories()
        },
        []);


    useEffect(() => {
            fetchNews(currentPage);
        }, [currentPage, selectedCategory, debouncedKeywords]);

    const handleNextPage = () => {
        if (currentPage < TOTAL_PAGES) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <main className={styles.main}>
            <Categories categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />

            <Search keywords={keywords} setKeywords={setKeywords} />

            <NewsBanner isLoading={isLoading} item={news && news[0]}/>

            <Pagination
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                handlePageClick={handlePageClick}
                totalPages={TOTAL_PAGES}
                currentPage={currentPage}
            />

            <NewsList isLoading={isLoading} news={news}/>

            <Pagination
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
                handlePageClick={handlePageClick}
                totalPages={TOTAL_PAGES}
                currentPage={currentPage}
            />
        </main>
    )
}
export default Main;
