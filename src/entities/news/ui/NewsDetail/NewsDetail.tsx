import { formatTimeAgo } from "@/shared/helpers/formatTimeAgo";
import { INews } from "../..";
import styles from "./styles.module.css";
import Image from "@/shared/ui/Image/Image.tsx";


interface Props {
    item: INews;
}

const NewsDetail = ({ item }: Props) => {
    return (
        <div className={styles.detail}>
            <Image image={item?.image}/>

            <div className={styles.description}>
                <p>
                    {item.description} ({item.language}) <a href={item.url} target="_blank">Read more...</a>
                </p>
                <p className={styles.extra}>
                    {formatTimeAgo(item.published)} by {item.author}
                </p>
                <ul>
                    {item.category.map(category => {
                        return <button
                            className={styles.item}
                            key={category}
                        >
                            {category}
                        </button>
                    })}
                </ul>
            </div>
        </div>
    );
};

export default NewsDetail;
