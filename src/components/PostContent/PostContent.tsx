import styles from "./PostContent.module.css";

interface PostContentProps {
  html: string;
  className?: string;
}

export function PostContent({ html, className }: PostContentProps) {
  const classes = className ? `${styles.postContent} ${className}` : styles.postContent;
  
  return (
    <div
      className={classes}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
