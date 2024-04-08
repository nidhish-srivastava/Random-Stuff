import { filterUsername } from "../utils";
import Image from "next/image"
import Link from "next/link";

const getRelativeDate = (inputDate) => {
    const currentDate = new Date(inputDate);
    const inputDateTime = new Date(inputDate);

    const oneDayInMillis = 24 * 60 * 60 * 1000;
    const daysDifference = Math.floor((currentDate - inputDateTime) / oneDayInMillis) + 1;

    if (currentDate.toDateString() === inputDateTime.toDateString()) {
        return "today";
    } else if (daysDifference === 0) {
        return "yesterday";
    } else if (daysDifference <= 6) {
        return `${daysDifference} days ago`;
    } else if (daysDifference == 7) {
        return "1 week ago";
    } else if (daysDifference > 7) {
        const options = { month: 'long', day: 'numeric' };
        return inputDateTime.toLocaleDateString(undefined, options);
    }
}
function PostCard({ postObj }) {

    let modifiedTitle = filterUsername(postObj.title)
    modifiedTitle = modifiedTitle?.replace(/[0-9]+%\s?/g, '');
    return (
        <Link href={`/item/${modifiedTitle}-${postObj._id}`} key={postObj?._id}>
            <div className="customsm:items-center flex flex-col border">
                <h2 className="text-[1.4rem] font-bold">
                    &#8377;
                    {postObj?.price}
                </h2>
                <div>
                    <Image src={postObj.images[0]} alt="" width={200} height={200} />
                </div>
                <h3 className="text-[1.2rem]">{postObj?.title}</h3>
                <h3>
                    {postObj?.location?.district} , {postObj?.location?.state}
                </h3>
                <h4>{getRelativeDate(postObj.createdAt)}</h4>
            </div>
        </Link>
    )
}

export default PostCard