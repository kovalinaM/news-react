import withSkeleton from "@/shared/hocs/withSkeleton.tsx";
import styles from "./styles.module.css";
import {INews} from "@/entities/news";
import NewsCard from "@/entities/news/ui/NewsCard/NewsCard.tsx";

interface Props {
    news?: INews[];
    type?: "banner" | "item";
    direction?: "row" | "column";
}

const NewsList = ({ news, type = "item" }: Props) => {
    return (
        <ul className={`${type === 'item' ? styles.items : styles.banners}` }>
            {news?.map((item) => {
                return <NewsCard key={item.id} item={item} type={type}/>;
            })}
        </ul>
    );
};

const NewsListWithSkeleton = withSkeleton(NewsList, 10);

export default NewsListWithSkeleton;
