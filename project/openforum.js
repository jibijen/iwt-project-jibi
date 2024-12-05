

const data = {
  currentUser: {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
    username: "shubham",
  },
  comments: [
    {
      parent: 0,
      id: 1,
      content:
        "Great explanation! This really helped clarify the topic. Perhaps we could add a discussion about practical examples to understand better.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "shubham",
      },
      replies: [],
    },
    {
      parent: 0,
      id: 2,
      content:
      "Thanks for sharing this! Can someone explain how this theory applies in real-world scenarios? I'd love to hear any additional insights.",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
        username: "jibitesh",
      },
      replies: [
        {
          parent: 2,
          id: 1,
          content:
        "In real-world scenarios, this approach can be applied in data analysis for educational research. It’s a bit challenging initially but becomes clearer with practice.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "jibitesh",
          user: {
            image: {
              png: "./images/avatars/image-ramsesmiron.png",
              webp: "./images/avatars/image-ramsesmiron.webp",
            },
            username: "rahul",
          },
        },
        {
          parent: 2,
          id: 2,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "rahul",
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "shubham",
          },
        },
      ],
    },
  ],
};

function appendFrag(frag, parent) {
  const children = Array.from(frag.childNodes);
  parent.appendChild(frag);
  return children[1];
}

const addComment = (body, parentId, replyTo = undefined) => {
  const commentParent = parentId === 0
    ? data.comments
    : data.comments.find((c) => c.id === parentId).replies;

  const newComment = {
    parent: parentId,
    id: commentParent.length === 0
      ? 1
      : commentParent[commentParent.length - 1].id + 1,
    content: body,
    createdAt: "Now",
    replyingTo: replyTo,
    score: 0,
    replies: parentId === 0 ? [] : undefined,
    user: data.currentUser,
  };
  commentParent.push(newComment);
  initComments();
};

const deleteComment = (commentObject) => {
  if (commentObject.parent === 0) {
    data.comments = data.comments.filter((e) => e !== commentObject);
  } else {
    const parentComment = data.comments.find((e) => e.id === commentObject.parent);
    parentComment.replies = parentComment.replies.filter((e) => e !== commentObject);
  }
  initComments();
};

const promptDel = (commentObject) => {
  const modalWrp = document.querySelector(".modal-wrp");
  modalWrp.classList.remove("invisible");
  modalWrp.querySelector(".yes").addEventListener("click", () => {
    deleteComment(commentObject);
    modalWrp.classList.add("invisible");
  });
  modalWrp.querySelector(".no").addEventListener("click", () => {
    modalWrp.classList.add("invisible");
  });
};

const spawnReplyInput = (parent, parentId, replyTo = undefined) => {
  parent.querySelectorAll(".reply-input").forEach((e) => e.remove());

  const inputTemplate = document.querySelector(".reply-input-template");
  const inputNode = inputTemplate.content.cloneNode(true);
  const addedInput = appendFrag(inputNode, parent);

  addedInput.querySelector(".bu-primary").addEventListener("click", () => {
    const commentBody = addedInput.querySelector(".cmnt-input").value;
    if (commentBody.length === 0) return;
    addComment(commentBody, parentId, replyTo);
  });
};

const createCommentNode = (commentObject) => {
  const commentTemplate = document.querySelector(".comment-template");
  const commentNode = commentTemplate.content.cloneNode(true);

  commentNode.querySelector(".usr-name").textContent = commentObject.user.username;
  commentNode.querySelector(".usr-img").src = commentObject.user.image.webp;
  commentNode.querySelector(".score-number").textContent = commentObject.score;
  commentNode.querySelector(".cmnt-at").textContent = commentObject.createdAt;
  commentNode.querySelector(".c-body").textContent = commentObject.content;

  if (commentObject.replyingTo) {
    commentNode.querySelector(".reply-to").textContent = "@" + commentObject.replyingTo;
  }

  commentNode.querySelector(".score-plus").addEventListener("click", () => {
    commentObject.score++;
    initComments();
  });

  commentNode.querySelector(".score-minus").addEventListener("click", () => {
    commentObject.score = Math.max(commentObject.score - 1, 0);
    initComments();
  });

  if (commentObject.user.username === data.currentUser.username) {
    commentNode.querySelector(".comment").classList.add("this-user");
    commentNode.querySelector(".delete").addEventListener("click", () => promptDel(commentObject));

    commentNode.querySelector(".edit").addEventListener("click", (e) => {
      const path = e.currentTarget.closest(".comment").querySelector(".c-body");
      const isEditable = path.getAttribute("contenteditable");
      path.setAttribute("contenteditable", isEditable !== "true");
      if (isEditable !== "true") path.focus();
    });
  }
  return commentNode;
};

const appendComment = (parentNode, commentNode, parentId) => {
  const buReply = commentNode.querySelector(".reply");
  const appendedCmnt = appendFrag(commentNode, parentNode);
  const replyTo = appendedCmnt.querySelector(".usr-name").textContent;

  buReply.addEventListener("click", () => {
    const replyContainer = parentNode.classList.contains("replies")
      ? parentNode
      : appendedCmnt.querySelector(".replies");
    spawnReplyInput(replyContainer, parentId, replyTo);
  });
};

function initComments(commentList = data.comments, parent = document.querySelector(".comments-wrp")) {
  parent.innerHTML = "";
  commentList.forEach((element) => {
    const parentId = element.parent === 0 ? element.id : element.parent;
    const commentNode = createCommentNode(element);

    if (element.replies && element.replies.length > 0) {
      initComments(element.replies, commentNode.querySelector(".replies"));
    }
    appendComment(parent, commentNode, parentId);
  });
}

initComments();

const cmntInput = document.querySelector(".reply-input");
cmntInput.querySelector(".bu-primary").addEventListener("click", () => {
  const commentBody = cmntInput.querySelector(".cmnt-input").value;
  if (commentBody.length === 0) return;
  addComment(commentBody, 0);
  cmntInput.querySelector(".cmnt-input").value = "";
});
