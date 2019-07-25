title: Ipython使用
author: tyrantqiao
tags:
  - python
categories: []
date: 2018-08-05 14:01:00
copyright: true
toc: true
---
If you download python2 and python3 together.
Make sure the ipython use the same version (It is recommend that the latest ipython as many packages suit for python3.

- `install`
    ```
    apt-get install ipython
    ```

    ```
    pip3 install (If only one version, pip is enough)
    ```

    ```
    yum install
    ```

- `basic package`
    - [x] numpy
    - [x] pandas
    - [x] matplotlib [this one may cause error, `yum install tk-devel`
    - [x] scipy

    PS: how to directly add some control like `import pandas as pd` to startup:  $path/startup     [~/.ipython/profile_default/startup/]
    crate a new .py or .ipy file. add the code you want.

- basic control
   ```
    obj? -- see code's description which is in pre-string.
    obj?? -- see code
    xx.*sdw*? -- search
   ```

- features
```
%run test.py
%timeit xxx.py
%debug xx.py
run xx.py
%prun -l 7 -s cumulative
```

- numpy
    -[x] a=np.array()
    -[x] a.astype(int32,float64)
    -[x] a.reshape()
    -[x] a.Std()
    -[x] a.var() 根号(总xi^2/N-x平均^2)
    -[x] a.cumprod()
    -[x] a.any()
    -[x] a.unique()

    np.save() => .npy
    np.load()
    np.savez() => .npz
    np.load()
    np.loadtxt()

    ```
    from numpy.linaglg import inv,qv
    inv(arr) 求逆
    qr(arr) 行列式
    ```

- Series

