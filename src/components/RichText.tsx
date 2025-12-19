import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

interface RichTextProps {
  content: any; // The JSON content from Contentful
  className?: string;
}

const RichText = ({ content, className = "prose max-w-none text-gray-700 text-lg" }: RichTextProps) => {
  if (!content) return null;

  return (
    <div className={className}>
      {documentToReactComponents(content, {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (_node, children) => {
            if (!children) return <p></p>;
            
            // Process children to convert line breaks to <br> tags
            const processChildren = (nodes: any[]): any[] => {
              return nodes.flatMap((node, index) => {
                if (typeof node === 'string') {
                  const parts = node.split('\n');
                  if (parts.length === 1) return node;
                  return parts.flatMap((part, i) => 
                    i < parts.length - 1 ? [part, <br key={`br-${index}-${i}`} />] : part
                  );
                }
                return node;
              });
            };
            
            return <p>{processChildren(Array.isArray(children) ? children : [children])}</p>;
          },
        },
        renderText: (text: string) => {
          return text.split('\n').reduce((acc: any[], line, index, array) => {
            acc.push(line);
            if (index < array.length - 1) {
              acc.push(<br key={`text-br-${index}`} />);
            }
            return acc;
          }, []);
        },
      })}
    </div>
  );
};

export default RichText;

