import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Flag, Pencil, Telescope, Trash2 } from "lucide-react";

type PostItemDropdownMenuProps = {
  postId: number;
  isCreator: boolean;
  openConfirmDeletePostModal: (postId: number) => void;
};

const PostItemDropdownMenu: React.FC<PostItemDropdownMenuProps> = ({
  postId,
  isCreator,
  openConfirmDeletePostModal,
}) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Ellipsis size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem>
          <Telescope className="w-[1.125rem] h-[1.125rem] mr-2" /> View
        </DropdownMenuItem>
        {isCreator ? (
          <DropdownMenuItem>
            <Pencil className="w-[1.125rem] h-[1.125rem] mr-2" /> Edit
          </DropdownMenuItem>
        ) : null}
        {isCreator ? (
          <DropdownMenuItem
            className="font-semibold hover:!text-red-800 text-red-600"
            onClick={() => openConfirmDeletePostModal(postId)}
          >
            <Trash2 className="w-[1.125rem] h-[1.125rem] mr-2" /> Delete
          </DropdownMenuItem>
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
