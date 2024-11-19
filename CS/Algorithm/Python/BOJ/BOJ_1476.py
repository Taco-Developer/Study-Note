E, S, M = map(int, input().split())

answer = 0
now = [0, 0, 0]

# S를 먼저 맞추기
answer += S
now[1] = S

# E의 범위는 1 ~ 15이므로 나머지가 0인 경우 15년
now[0] = S % 15
if now[0] == 0:
    now[0] = 15

# M의 범위는 1 ~ 19이므로 나머지가 0인 경우 19년
now[2] = S % 19
if now[2] == 0:
    now[2] = 19

# E, S, M이 일치하는 경우 종료
while now[0] != E or now[2] != M:
    # 다음 S가 일치하는 28년 뒤 확인
    answer += 28

    # 28년 뒤 E
    now[0] = (now[0] + 28) % 15
    if now[0] == 0:
        now[0] = 15

    # 28년 뒤 M
    now[2] = (now[2] + 28) % 19
    if now[2] == 0:
        now[2] = 19

print(answer)