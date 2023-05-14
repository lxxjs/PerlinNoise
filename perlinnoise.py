import math
from random import random

TOTAL_CELL_NUM = 256
TOTAL_GRID_POINT_NUM = 25

FINAL_RESULT = [None] * math.isqrt(TOTAL_CELL_NUM)
GRID_POINT_GRADIENT = [None] * TOTAL_GRID_POINT_NUM

def create_rand_gradient():
    for i in range(TOTAL_GRID_POINT_NUM):
        GRID_POINT_GRADIENT[i] = 2 * math.pi * random()

create_rand_gradient()
print(GRID_POINT_GRADIENT)

