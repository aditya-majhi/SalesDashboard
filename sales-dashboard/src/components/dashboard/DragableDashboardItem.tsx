import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface DraggableDashboardItemProps {
  id: string;
  isDraggable: boolean;
  children: React.ReactNode;
  className?: string;
}

const DraggableDashboardItem = ({
  id,
  isDraggable,
  children,
  className,
}: DraggableDashboardItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
    position: isDragging ? "relative" : "static",
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style as React.CSSProperties}
      className={cn(
        isDraggable ? "cursor-grab active:cursor-grabbing" : "",
        isDragging ? "z-50" : "",
        className
      )}
      {...(isDraggable ? { ...attributes, ...listeners } : {})}
      whileHover={isDraggable ? { scale: 1.005 } : {}}
    >
      {children}
    </motion.div>
  );
};

export default DraggableDashboardItem;
