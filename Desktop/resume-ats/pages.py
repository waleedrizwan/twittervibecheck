import PyPDF2
import re

# how do we add logic to determine which pages to pull into what category

# We can implement a kitchenmate standard for mandatory grade report 
# mandatory cover letter etc...

# even if cover letter is non mandatory
# only the grade report and coop work term page need this type of function applied 

# first and last page will always be the ones with the fucked up text 

pdfFileObject = open("kmtest.pdf", 'rb')
pdfReader = PyPDF2.PdfFileReader(pdfFileObject)
text=''

for i in range(0,pdfReader.numPages):
    # creating a page object
    pageObj = pdfReader.getPage(i)
    # extracting text from page
    text=text+pageObj.extractText()

pdf_text = " ".join(text.replace('\n', '').split()) 

# converts a string into a list where each element is each word in the string
test_list = pdf_text.split(" ")
print(test_list)

# we then want to get rid of the strange issue with some of the coop pages where the words have no spaces in between

# # Function to convert  
# def listToString(s): 
#     # initialize an empty string
#     str1 = ""     
#     # traverse in the string  
#     for ele in s: 
#         str1 += ele  
#     # return string  
#     return str1 
        
# # using regex() to perform task
# res = [re.sub(r"(\w)([A-Z])", r"\1 \2", ele) for ele in test_list]

# print(res)

# " ".join(pageObj.extractText().replace('\n', '').split())