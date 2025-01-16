import withSkeleton from "../../helpers/hocs/withSkeleton";
import NewsItem from "../NewsItem/NewsItem.tsx";
import styles from "./styles.module.css";
import {INews} from "@/interfaces";

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
