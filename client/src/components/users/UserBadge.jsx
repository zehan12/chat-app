import { Badge } from "../ui/badge";
import { useState, useEffect } from "preact/compat";
import { Fragment, memo } from "preact/compat";
import { X } from "lucide-react";
import { getRandomColor } from "@/utils/general.utils";

const UserBadge = memo(({ id, name, onClick }) => {
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor());

  useEffect(() => {
    setBackgroundColor(randomColor());
  }, [id]);

  return (
    <Fragment key={id}>
      <Badge
        style={{ background: backgroundColor }}
        className="h-6 max-w-max text-background flex gap-2 cursor-pointer"
      >
        {name}{" "}
        <X
          onClick={() => onClick(id)}
          size={12}
          className="hover:text-red-700"
        />
      </Badge>
    </Fragment>
  );
});

export default UserBadge;
