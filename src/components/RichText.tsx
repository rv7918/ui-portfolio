import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

interface RichTextProps {
  content: any; // The JSON content from Contentful
  className?: string;
}

const RichText = ({ content, className = "prose max-w-none text-gray-700" }: RichTextProps) => {
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
            
            return <p className="mb-4">{processChildren(Array.isArray(children) ? children : [children])}</p>;
          },
          [BLOCKS.HEADING_1]: (_node, children) => <h1 className="text-4xl font-bold mb-4 mt-6">{children}</h1>,
          [BLOCKS.HEADING_2]: (_node, children) => <h2 className="text-3xl font-bold mb-3 mt-5">{children}</h2>,
          [BLOCKS.HEADING_3]: (_node, children) => <h3 className="text-2xl font-semibold mb-2 mt-4">{children}</h3>,
          [BLOCKS.HEADING_4]: (_node, children) => <h4 className="text-xl font-semibold mb-2 mt-3">{children}</h4>,
          [BLOCKS.HEADING_5]: (_node, children) => <h5 className="text-lg font-semibold mb-2 mt-3">{children}</h5>,
          [BLOCKS.HEADING_6]: (_node, children) => <h6 className="text-base font-semibold mb-2 mt-2">{children}</h6>,
          [BLOCKS.UL_LIST]: (_node, children) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
          [BLOCKS.OL_LIST]: (_node, children) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
          [BLOCKS.LIST_ITEM]: (_node, children) => <li className="ml-4">{children}</li>,
          [BLOCKS.QUOTE]: (_node, children) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>,
          [BLOCKS.HR]: () => <hr className="my-6 border-gray-300" />,
          [INLINES.HYPERLINK]: (node, children) => {
            return <a href={node.data.uri} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">{children}</a>;
          },
        },
        renderMark: {
          [MARKS.BOLD]: (text) => <strong className="font-bold">{text}</strong>,
          [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
          [MARKS.UNDERLINE]: (text) => <u className="underline">{text}</u>,
          [MARKS.CODE]: (text) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{text}</code>,
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

