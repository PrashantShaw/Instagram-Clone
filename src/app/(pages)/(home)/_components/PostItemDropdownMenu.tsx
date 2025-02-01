import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Ellipsis,
  Flag,
  Link as LinkIcon,
  Pencil,
  Telescope,
} from "lucide-react";
import DeletePostMenuItem from "./DeletePostMenuItem";
import Link from "next/link";

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
        <Link href={`/posts/${postId}`}>
          <DropdownMenuItem onClick={() => {}}>
            <Telescope className="w-[1.125rem] h-[1.125rem] mr-2" /> Go to post
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => {}}>
          <LinkIcon className="w-[1.125rem] h-[1.125rem] mr-2" /> Copy link
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
