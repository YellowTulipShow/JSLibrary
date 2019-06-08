# coding: UTF-8

import sys
import os
import re

def join_file_path(relative_file_path):
    localpath = os.path.split(sys.argv[0])
    filepath = os.path.join(localpath[0], relative_file_path)
    return filepath

def abs_file_read(absolute_file_path):
    file = open(absolute_file_path, encoding='utf-8', mode='r')
    filecontent = file.read()
    file.close();
    return filecontent

def file_write(relative_file_path, content):
    filepath = join_file_path(relative_file_path);
    file = open(filepath, encoding='utf-8', mode='w')
    file.write(content)
    file.close();

def find_all_js(root = ''):
    jsfiles = []
    root = join_file_path(root)
    if os.path.isfile(root):
        if re.search(r'.+\.js', root, re.I | re.M | re.U) != None:
            jsfiles.append(root);
        return jsfiles

    if not os.path.isdir(root):
        return []

    # 当前路径不是 git 存储库
    folders = os.listdir(root)
    for folder in folders:
        path = os.path.join(root, folder)
        silist = find_all_js(path)
        if len(silist) > 0:
            for i in silist:
                jsfiles.append(i)
    return jsfiles

jsfiles = find_all_js('..');

all_js_content = ''
for path in jsfiles:
    all_js_content += abs_file_read(path)

dirname = '__reuslt__'
filename = 'base.js'

dirpath = join_file_path(dirname)
if not os.path.exists(dirpath):
    os.makedirs(dirpath)
file_write(dirname + '\\' + filename, all_js_content)
