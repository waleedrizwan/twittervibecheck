import PyPDF2
import re
from os import path
from glob import glob  

# creating a pdf file object
pdfFileObj = open('test_package.pdf', 'rb')
# creating a pdf reader object
pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
 # creating a page object
pageObj = pdfReader.getPage(2)
pdf_text = " ".join(pageObj.extractText().replace('\n', '').split())
# closing the pdf file object
pdfFileObj.close()

pdfFileObject = open("test_package.pdf", 'rb')
pdfReader = PyPDF2.PdfFileReader(pdfFileObject)
text=''
for i in range(0,pdfReader.numPages):
    # creating a page object
    pageObj = pdfReader.getPage(i)
    # extracting text from page
    text=text+pageObj.extractText()

pdf_text_2 = " ".join(text.replace('\n', '').split()) 

def find_matching_sentences(sentence, word):
    # find the index positions of the word: sentence[x:y]
    # return the sentence:  sentence[x - n: y + n], where n is some constant

    matching_indices = [m.start() for m in re.finditer(word, sentence)]
    matching_sentences = []

    if len(matching_indices) < 1:
        print(word + ' Not Found\n')
        return matching_sentences
    print('Matching Indices', matching_indices)

    for pos in matching_indices:
        for i in reversed(range(150)):      
            try:                        
                if pos - i < 0:
                    continue            
                else:                                
                    regex = r'\b\w+\b'                    
                    matching_sentence = sentence[pos - 10 : pos + len(word) + i]                
                    matching_words = re.findall(regex,  matching_sentence)
                    all_resume_words = re.findall(regex, pdf_text )
                    full_words =  []
                    for x in matching_words:
                        if x in all_resume_words:
                            full_words.append(x)
                    matching_sentence = " ".join(full_words)               
                    matching_sentences.append(matching_sentence)                  
                    break
            except:
                continue
    return matching_sentences

def find_ext(dr, ext, ig_case=True):
    if ig_case:
        ext =  "".join(["[{}]".format(
                ch + ch.swapcase()) for ch in ext])
    return glob(path.join(dr, "*." + ext))


def read_pdf(pdf_path):
    '''
    Converts all PDF text into string

    '''
        
    pdfFileObject = open(pdf_path, 'rb')
    pdfReader = PyPDF2.PdfFileReader(pdfFileObject)
    text=''
    for i in range(0,pdfReader.numPages):
        # creating a page object
        pageObj = pdfReader.getPage(i)
        # extracting text from page
        text=text+pageObj.extractText()
    pdfFileObj.close()
    pdf_text = " ".join(text.replace('\n', '').split()) 
    return pdf_text

def get_app_paths():

    raw_app_paths =  find_ext('.', 'pdf')
    coop_app_paths = [ ]

    for path in raw_app_paths:
        coop_app_paths.append(path[2:])
    
    return coop_app_paths

def parse_applications(paths):
    '''
    parses all coop applications in the same directory

    '''
    # score for each keyword 
    key_words_score =  {'Outstanding': [], 'Node':[], 'JavaScript':[], 'Angular':[], 'Python':[], 'Answered Questions':[] ,'Excellent':[], 'Express':[], 'CoffeeScript':[]}
    # need this array to iterate as dictionary cannot be modified during iteration 
    iterate_words = ['Outstanding', 'Node', 'JavaScript', 'Angular', 'Python', 'Answered Questions' ,'Excellent', 'Express', 'CoffeeScript']
    # will later become the rows for the final dataframe
    all_path_data = []

    for path in paths:
        pdf_text = read_pdf(path)
        # keywords holds the matching sentences
        current_path_data = { 'path': '', 'score': 0, 'Outstanding': [], 'Node':[], 'JavaScript':[], 'Angular':[], 'Python':[], 'Express':[], 'CoffeeScript':[]}    
      
        for word in iterate_words:
            matching_sentences = find_matching_sentences(pdf_text, word)
            if len(matching_sentences) > 0:
                current_path_data['score']  = current_path_data['score'] + key_words_score[word]  
    
        current_path_data['path'] = path
        all_path_data.append(key_word_data)

    # row of DataFrame
    return all_path_data


def create_keywords_sheet():
    # build dataframe to use as the matching keywords sheet
    pass


def create_score_sheet():
    pass


if __name__ == '__main__':

    # returns list of all PDF file paths within the same directory  
    application_paths = get_app_paths()
    # parses all application packages and saves data for each package in list 
    all_path_data =  parse_applications(application_paths) # path name is like a username



# //// to do 
# make two data frames for two tabs 
# one tab has the keyword columns and the matching sentences, here we can find and add the github link to a column, maybe also a quick analysis of the ,
# add column that finds email address automatically 
# one tab has the score and each employees score and comments on the application package  
# once in dataframe format then move onto how we can automatically upload this data to google sheets




