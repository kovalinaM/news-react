import withSkeleton from "@/shared/hocs/withSkeleton.tsx";
import NewsItem from "@/entities/news/ui/NewsItem/NewsItem.tsx";
import styles from "./styles.module.css";
import {INews} from "@/entities/news";

interface Props {
    news?: INews[];
}

const NewsList = ({ news }: Props) => {
    return (
        <ul className={styles.list}>
            {news?.map((item) => {
                return <NewsItem key={item.id} item={item} />;
            })}
        </ul>
    );
};

const NewsListWithSkeleton = withSkeleton(NewsList, "item", 10);

export default NewsListWithSkeleton;
