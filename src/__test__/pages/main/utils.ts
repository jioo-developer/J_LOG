import { FirebaseData } from "@/static/types/common";
import { Timestamp } from "firebase/firestore";

const mockPostData: FirebaseData[] = [
  {
    user: "user1",
    pageId: "page1",
    profile: "https://example.com/profile1.jpg",
    date: "2025-02-21",
    timestamp: Timestamp.fromDate(new Date()),
    title: "Test Post",
    fileName: ["file1.jpg", "file2.jpg"],
    url: ["https://example.com/file1.jpg", "https://example.com/file2.jpg"],
    favorite: 5,
    text: "This is a test post.",
    writer: "User One",
    priority: true,
    replyLength: 3,
  },
  {
    user: "user2",
    pageId: "page2",
    profile: "https://example.com/profile2.jpg",
    date: "2025-02-20",
    timestamp: Timestamp.fromDate(new Date()),
    title: "Another Post",
    fileName: ["file3.jpg"],
    url: ["https://example.com/file3.jpg"],
    favorite: 2,
    text: "Another test post.",
    writer: "User Two",
    priority: false,
    replyLength: 1,
  },
];

export default mockPostData;
