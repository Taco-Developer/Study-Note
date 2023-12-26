// 게시글 타입 인터페이스로 정의
export interface PostDto {
  id: string;
  title: string;
  content: string;
  name: string;
  createdAt: Date;
  // 수정 일시는 필수가 아님
  updatedAt?: Date;
}
