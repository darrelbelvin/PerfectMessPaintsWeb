import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pandas as pd
import os
import shutil
import time
from PIL import Image

pictures_dir = 'D:/Libraries/Documents/Projects/Jenna Paintings/'

def get_data():
    scope = ['https://spreadsheets.google.com/feeds',
            'https://www.googleapis.com/auth/drive']

    credentials = ServiceAccountCredentials.from_json_keyfile_name(
            'gcloud_connection/perfect-mess-paints-website-ba51dd8e2002.json', scope) # Your json file here

    gc = gspread.authorize(credentials)

    wks = gc.open("Perfect Mess Paints").sheet1

    data = wks.get_all_values()
    headers = data.pop(2)

    df = pd.DataFrame(data[2:], columns=headers)
    df[['Available', 'Ready For Website', 'Images Processed']] = df[['Available', 'Ready For Website', 'Images Processed']] == '✓'
    df = df[df['Ready For Website']]
    df.drop(columns=['Picture', 'Images Processed', 'Ready For Website', 'Notes'], inplace=True)
    
    return df

def process_row(row, reset = True):
    title = row['Title'] if row['Title'] != '' else f"Creation {row['Folder #']}"
    print(title)
    new_folder = f"./content/blog/{title.lower().replace(' ', '-')}/"
    src_folder = f"{pictures_dir}{row['Folder #']}/"
    body_file = f'{src_folder}body.md'

    if os.path.exists(new_folder):
        if reset:
            shutil.rmtree(new_folder)
            while os.path.exists(new_folder):
                time.sleep(0.1)
            os.mkdir(new_folder)
    else:
        os.mkdir(new_folder)

    imgs = copy_pictures(src_folder, new_folder)
    tags = [row['Size']]
    if row['Tags'] != '':
        tags += row['Tags'].split(', ')
    if row['Series'] != '':
        tags.append(f"Series {row['Series']}")

    md_lines = [
        '---',
        f"title: {title}",
        f"date: '{row['Date']}'",
        f'thumbnail: {imgs[0]}',
        f"description: {row['Description']}",
        'tags:'
    ] + [f'  - {tag}' for tag in tags] + [
        f"available: {str(row['Available']).lower()}",
        f"price: '{row['Price']}'",
        '---',
    ]

    if os.path.exists(body_file):
        md_body = ['']
        with open(body_file, 'r') as bfile:
            md_body += bfile.readlines()
        md_body = [l if not l.strip().isnumeric() else f'![]({imgs[int(l)]})\n' for l in md_body]
    else:
        md_body = ['']
        for img in imgs[1:]:
            md_body.append(f'![]({img})\n')

    with open(f'{new_folder}index.md', 'w') as md:
        md.writelines('\n'.join(md_lines) + '\n')
        md.writelines('\n'.join(md_body) + '\n')
    
    return True

def copy_pictures(source_folder, target_folder, resize = True):
    image_names = []
    order = []
    for filename in os.listdir(source_folder):
        if filename.startswith("final_"):
            split = filename.split('_')
            if split[0] == 'final':
                new_file = '_'.join(split[2:])
                image_names.append(new_file)
                if not os.path.exists(target_folder + new_file):
                    if resize:
                        basewidth = 2000
                        img = Image.open(source_folder + filename)
                        wpercent = (basewidth/float(img.size[0]))
                        hsize = int((float(img.size[1])*float(wpercent)))
                        img = img.resize((basewidth,hsize), Image.ANTIALIAS)
                        img.save(target_folder + new_file, 'JPEG', quality=70)
                    else:
                        shutil.copy(source_folder + filename, target_folder + new_file)
                order.append(int(split[1]))
    
    return [name for _, name in sorted(zip(order, image_names))]

if __name__ == "__main__":
    get_data().apply(lambda row: process_row(row, False), axis=1)