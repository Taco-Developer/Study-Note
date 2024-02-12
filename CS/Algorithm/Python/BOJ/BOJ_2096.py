import sys
input = sys.stdin.readline

N = int(input())
max_sum = [0, 0, 0]
min_sum = [0, 0, 0]

for _ in range(N):
    a, b, c = map(int, input().split())
    max_sum = [max(max_sum[0], max_sum[1]) + a, max(max_sum) + b, max(max_sum[1], max_sum[2]) + c]
    min_sum = [min(min_sum[0], min_sum[1]) + a, min(min_sum) + b, min(min_sum[1], min_sum[2]) + c]

print(max(max_sum), min(min_sum))