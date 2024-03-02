import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/accordion";
import { MdHandyman } from "react-icons/md";
import { Link } from "react-router-dom";

const TopicsCreatedBy = ({ userName, topics }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`Topics created by ${userName}`}>
        <AccordionTrigger>
          <div className="flex items-center gap-4">
            <MdHandyman />
            Topics created by {userName}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex gap-4">
            {topics.map((topic) => (
              <Link
                to={`/topics/${topic._id}`}
                className="topic_card_sm"
                title={topic.title}
              >
                <h5 className="font-semibold text-md">
                  {topic.title.length >= 10
                    ? topic.title.slice(0, 10) + "..."
                    : topic.title}
                </h5>
                <p className="text-xs">{topic.postsCounter} posts</p>
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TopicsCreatedBy;
