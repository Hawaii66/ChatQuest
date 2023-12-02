import { createContext, useRef, useState } from "react";
import { Comment } from "../Interfaces/Comment";
import Comments from "../Components/Comments";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

type CommentContextType = {
  open: boolean;
  setOpen: (comments: Comment[]) => void;
};

export const CommentContext = createContext<CommentContextType | undefined>(
  undefined
);

export function CommentContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const ref = useRef<BottomSheetModal>(null);

  return (
    <CommentContext.Provider
      value={{
        open: comments.length > 0,
        setOpen: (c) => {
          if (c.length > 0) {
            ref.current?.present();
            setComments(c);
          } else {
            setComments([]);
            ref.current?.dismiss();
          }
        },
      }}
    >
      {children}
      <Comments ref={ref} comments={comments} />
    </CommentContext.Provider>
  );
}
