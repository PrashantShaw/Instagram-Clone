import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Flag, Link, Pencil, Telescope } from "lucide-react";
import DeletePostMenuItem from "./DeletePostMenuItem";

type PostItemDropdownMenuProps = {
  postId: number;
  isCreator: boolean;
};

const PostItemDropdownMenu: React.FC<PostItemDropdownMenuProps> = ({
  postId,
  isCreator,
}) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Ellipsis size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => {}}>
          <Telescope className="w-[1.125rem] h-[1.125rem] mr-2" /> Go to post
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <Link className="w-[1.125rem] h-[1.125rem] mr-2" /> Copy link
        </DropdownMenuItem>
        {isCreator ? (
          <DropdownMenuItem onClick={() => {}}>
            <Pencil className="w-[1.125rem] h-[1.125rem] mr-2" /> Edit
          </DropdownMenuItem>
        ) : null}
        {isCreator ? (
          <DeletePostMenuItem postId={postId} />
        ) : (
          <DropdownMenuItem className="font-semibold hover:!text-red-800 text-red-600">
            <Flag className="w-[1.125rem] h-[1.125rem] mr-2" /> Report
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostItemDropdownMenu;
