from os import path
from glob import glob  
import PyPDF2

def find_ext(dr, ext, ig_case=True):
    if ig_case:
        ext =  "".join(["[{}]".format(
                ch + ch.swapcase()) for ch in ext])
    return glob(path.join(dr, "*." + ext))

raw_app_paths =  find_ext('.', 'pdf')
coop_app_paths = [ ]

for app in raw_app_paths:
    coop_app_paths.append(app[2:])

print(coop_app_paths)


# for path in coop_app_paths:
#     with open(path, mode='rb') as f:
#         reader = PyPDF2.PdfFileReader(f)
#         page = reader.getPage(0)
#         print(page.extractText())















