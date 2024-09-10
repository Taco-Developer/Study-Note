N = int(input())
N_len = len(str(N))
answer = 0

while (N_len > 1):
    start_num = 10 ** (N_len - 1)
    answer += (N - start_num + 1) * N_len

    N = start_num - 1
    N_len -= 1

answer += N

print(answer % 1234567)