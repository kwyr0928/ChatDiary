"use client";

import { useEffect, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { useThemeStore } from "~/store/themeStore";
import Tag from "./tag";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

// タグ編集フォームUI
export default function InputTag(props: {
  initialTags: string[];
  initialTagList: string[];
  onChangeTags: (updatedTags: string[]) => void;
}) {
  const maxTagLength = 12;
  const { initialTags, initialTagList, onChangeTags } = props;
  const theme = useThemeStore((state) => state.theme);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [text, setText] = useState<string>("");
  const [error, setError] = useState("");
  const [tagList, setTagList] = useState(initialTagList);
  const [open, setOpen] = useState(false);
  // 入力されている状態でenterキーが押されたとき実行
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Enterキーのデフォルト動作（改行）を無効化
      addTags(text);
    }
  };

  useEffect(() => {
    // 初期値としてタグリストを更新
    setTagList(initialTagList);
  }, [initialTagList]);

  // エラー確認
  const errorCheck = (tag: string) => {
    if (tag === "") {
      return "作成するタグの名前を入力してください";
    } else if (tag.length > maxTagLength) {
      return `${maxTagLength}文字以内で入力してください`;
    } else if (tags.includes(tag)) {
      return "このタグはすでに追加されています";
    }
    return "";
  };

  // 文字列をタグに追加し、入力欄を空にする
  const addTags = (newItem: string) => {
    const errorMes = errorCheck(newItem.trim()); // エラー確認
    setError(errorMes);
    if (errorMes.length === 0) {
      setTags((prevItems) => {
        const updatedTags = [...prevItems, newItem.trim()];
        return updatedTags;
      }); // 新しい配列を作成
      setText("");
      if (!tagList.includes(newItem)) {
        setTagList((prevItems) => [...prevItems, newItem.trim()]);
      }
    }
  };

  useEffect(() => {
    if (tags != initialTags) {
      onChangeTags(tags);
    } // レンダリング完了後に状態を親に通知
  }, [initialTags, onChangeTags, tags]);

  // タグを削除
  const removeTag = (removeItem: string) => {
    setTags((prevItems) => prevItems.filter((item) => item !== removeItem));
  };

  return (
    <div className="flex w-full flex-col items-start justify-center">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {tags.length !== 0 ? (
          <div className="mb-1 flex flex-wrap items-center gap-2">
            {tags.map((tag, tagIndex) => (
              <Tag
                key={tagIndex}
                text={tag}
                onRemoveTag={(removeItem) => removeTag(removeItem)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center"></div>
        )}
        {/* タグ一覧リスト */}
        <div className="mb-2 flex w-full items-center">
          <div
            className={`mr-3 flex h-10 w-4/5 rounded-md border border-input bg-background text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none md:text-sm border-theme${theme}-primary`}
          >
            <Input
              type="text"
              className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder={`タグを追加（最大${maxTagLength}文字） `}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              value={text}
            />
            <Separator orientation="vertical" />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="acitve:bg-transparent border-none bg-transparent hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <IoChevronDownSharp />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="検索" />
                  <CommandList>
                    <CommandEmpty>タグがありません</CommandEmpty>
                    <CommandGroup>
                      {tagList.map((tagItem, index) => (
                        <CommandItem
                          key={index}
                          value={tagItem}
                          onSelect={(currentValue) => {
                            setText(currentValue);
                            //setOpen(false)
                          }}
                        >
                          {tagItem}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <Button
            className={`bg-theme${theme}-primary hover:bg-theme${theme}-hover`}
            onClick={() => addTags(text)}
          >
            追加
          </Button>
        </div>
        {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
