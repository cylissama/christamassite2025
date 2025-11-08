"use client";

import React, { useState } from "react";

const avatarList = [
  "/avatars/santa_list.gif",
  "/avatars/tree_glow.gif",
  "/avatars/hat_animal.gif",
  "/avatars/cat.gif",
  "/avatars/chistmas_glaggle.gif",
  "/avatars/flag.gif",
  "/avatars/hh.gif",
  "/avatars/osaka.gif",
  "/avatars/rudolf.gif",
  "/avatars/snowman.gif",
  "/avatars/santa_walk.gif",
  "/avatars/lego.gif",
  "/avatars/pen.gif",
  "/avatars/wiz.gif",
];

interface AvatarSelector {
  selectedAvatar: string;
  onSelect: (avatar: string) => void;
}

export default function AvatarSelector({ selectedAvatar, onSelect }: AvatarSelector) {
  const [selected, setSelected] = useState(selectedAvatar);

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {avatarList.map((avatar, i) => (
        <img
          key={i}
          src={avatar}
          alt="avatar"
          className={`w-20 h-20 cursor-pointer rounded-full border-4 ${
            selected === avatar ? "border-pink-500" : "border-transparent"
          } hover:border-yellow-400 transition`}
          onClick={() => {
            setSelected(avatar);
            onSelect(avatar);
          }}
        />
      ))}
    </div>
  );
}