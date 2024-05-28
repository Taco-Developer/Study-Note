# N = int(input())
# nums = list(map(int, input().split()))

# answer = []
# now = 0
# moveCnt = 0
# while len(answer) < N:
#     while moveCnt != 0:
#         isLeft = True if moveCnt < 0 else False

#         now = now - 1 if isLeft else now + 1
#         if now == -1:
#             now = N - 1
#         elif now == N:
#             now = 0
        
#         if nums[now] != 0:
#             moveCnt = moveCnt + 1 if isLeft else moveCnt - 1

#     answer.append(now + 1)
#     moveCnt = nums[now]
#     nums[now] = 0

# print(*answer)

from collections import deque

answer = []
N = int(input())
# (index, num)으로 deque에 저장
dq = deque(enumerate(map(int, input().split())))

while dq:
    idx, num = dq.popleft()
    answer.append(idx + 1)

    # rotate => 음수는 왼쪽 회전, 양수는 오른쪽 회전
    # num이 양수이면 오른쪽으로 이동하므로 왼쪽 회전, num이 음수이면 왼쪽으로 이동하므로 오른쪽 회전
    # num이 양수인 경우 가장 앞부분을 이미 제거했으므로 num-1만큼 회전
    if num > 0:
        dq.rotate(-num + 1)
    else:
        dq.rotate(-num)

print(*answer)